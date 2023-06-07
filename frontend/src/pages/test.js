const fetchdata = async () => {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        mutation($input: ResponsesInput!) {
          createResponse(input: $input) {
            id
            date
            phonenumber
            name
            previoushires
            status
            jobid
            createdAt
          }
        }
      `,
      variables: {
        input: {
          name: name,
          jobid: id,
          username: username,
          createdAt: created_at,
          date: date
        }
      }
    })
  });
  const result = await response.json();

  
};
fetchdata();
}