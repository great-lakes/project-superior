exports.mentors =
`
query ($hackathonId: ID!) {
  hackathon(id: $hackathonId) {
    name
    mentors {
      first_name
      last_name
      bio
      skills {
        name
      }
    }
  }
}
`

exports.getAzureCode =
`
mutation issueAzurecode($hackathonId: ID!, $studentName: String!, $studentEmail:String!, $projectName:String!, $projectDescription:String) {
  issueUnclaimedAzurecode(hackathonId: $hackathonId, studentName: $studentName, studentEmail: $studentEmail, projectName: $projectName, projectDescription: $projectDescription) {
    code
  }
}
`

exports.newQuestion =
`
mutation newInquiry($hackathonId: ID!, $studentName:String!, $studentEmail: String!, $question:String!) {
  newInquiry(hackathonId: $hackathonId, studentName: $studentName, studentEmail: $studentEmail, question: $question) {
    id
    question
  }
}
`
