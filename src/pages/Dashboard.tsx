import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { ShowIssuesAndPullRequests } from "../components";
import { Formik } from "formik";
import { StyledH1, Header, Error } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import styled from "styled-components";

const Form = styled("form")`
  text-align: center;
  padding: 20px;
`;

interface Page {
  path: string;
}

export class Dashboard extends React.Component<Page> {
  state = {
    owner: "",
    repoName: "",
    pullRequests: [],
    issues: [],
    touched: false,
    error: ""
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  renderForm = () => {
    return (
      <div>
        <StyledH1>{this.state.repoName} github report</StyledH1>
        <Header>
          {
            "Use this tool to see a dashboard of a team's work over the past week."
          }
        </Header>

        <Formik
          initialValues={{ owner: "", repoName: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
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
              handleReset
            } = props;
            return (
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  const { owner, repoName } = values;

                  this.setState({
                    owner: owner,
                    repoName: repoName,
                    touched: true
                  });

                  axios
                    .get(`${process.env.REACT_APP_API_URI}/pullRequests`, {
                      params: {
                        owner: owner,
                        repoName: repoName
                      }
                    })
                    .then(response => {
                      console.log(response.data);
                      const { pullRequests, issues } = response.data;
                      this.setState({
                        pullRequests: pullRequests.edges,
                        issues: issues.edges
                      });
                    })
                    .catch(err => {
                      this.setState({
                        error: err.response.data.message
                      });
                    });
                }}
              >
                <div>
                  <div>
                    {errors.repoName && touched.repoName && (
                      <div className="input-feedback">
                        <Error>{"You must supply the name of the repo"}</Error>
                      </div>
                    )}
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
                  </div>
                  <div>
                    {errors.owner && touched.owner && (
                      <div className="input-feedback">
                        <Error>
                          {
                            "You must supply the name of the organization that owns this repo"
                          }
                        </Error>
                      </div>
                    )}
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
                  </div>
                </div>
                <Button
                  type="button"
                  className="outline"
                  fontSize={20}
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button type="submit" fontSize={20} disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          {this.renderForm()}
          <Header>{this.state.error}</Header>
        </div>
      );
    } else {
      return (
        <div>
          {this.renderForm()}
          {this.state.touched && (
            <ShowIssuesAndPullRequests
              pullRequests={this.state.pullRequests}
              issues={this.state.issues}
            />
          )}
        </div>
      );
    }
  }
}
