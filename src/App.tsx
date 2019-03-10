import React, { Component } from "react";
import * as Yup from "yup";
import styled from "styled-components";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ShowIssuesAndPullRequests } from "./components";
import { Formik } from "formik";
import { H1, Label, Header, Error } from "./components/Text";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const StyledH1 = styled(H1)`
  font-size: 70px;
  text-align: center;
  font-family: "Oswald";

  @media (min-width: 700px) {
    padding: 20px 0 0 20px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #ffffff;
  color: #1745d7;
`;

const Form = styled("form")`
  text-align: center;
`;

class Request extends React.Component {
  state = {
    owner: "harrystech",
    repoName: "forge"
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <StyledH1>{this.state.repoName} github report</StyledH1>
        <Formik
          initialValues={{ owner: "", repoName: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            owner: Yup.string().required("Required"),
            repoName: Yup.string().required("Required")
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.setState({
                    owner: values.owner,
                    repoName: values.repoName
                  });
                }}
              >
                <div>
                  <div>
                    <Header>
                      Please supply the name of the repository you're looking
                      for and the owner of that project
                    </Header>
                    <Input
                      id="repoName"
                      placeholder="Name of the repo"
                      type="text"
                      value={values.repoName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.repoName && touched.repoName
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.repoName && touched.repoName && (
                      <div className="input-feedback">
                        <Error>{errors.repoName}</Error>
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      id="owner"
                      placeholder="Owner of the repository"
                      type="text"
                      value={values.owner}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.owner && touched.owner
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.owner && touched.owner && (
                      <div className="input-feedback">
                        <Error>{errors.owner}</Error>
                      </div>
                    )}{" "}
                  </div>
                </div>
                <Button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>

        <ShowIssuesAndPullRequests
          owner={this.state.owner}
          name={this.state.repoName}
          author="maecapozzi"
        />
      </ApolloProvider>
    );
  }
}

class App extends Component {
  render() {
    return <Request />;
  }
}

export default App;
