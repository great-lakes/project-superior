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

exports.getSessions =
`
query getSessions($hackathonId: ID!) {
  hackathon(id: $hackathonId) {
    sessions {
      name
      time
      day
      description
      place
    }
  }
}
`

exports.getSurvey =
`
query getSurvey($hackathonId: ID!) {
  hackathon(id: $hackathonId) {
    survey_promo
    survey_link
    survey_prize
  }
}
`

exports.getTechnologies =
`
query getTechnologies($hackathonId: ID!) {
  hackathon(id: $hackathonId) {
    technologies {
      name
      doc_link
      help_text
    }
  }
}
`
