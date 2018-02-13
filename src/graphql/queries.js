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
