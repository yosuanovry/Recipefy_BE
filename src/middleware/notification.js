module.exports = (recipeName, user) => {
    const notifOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Basic ${process.env.REST_API_KEY}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          included_segments: ['Subscribed Users'],
          contents: {en: 'Check it out now!'},
          name: `${user} Has Posted ${recipeName}`
        })
      };
    
      fetch('https://onesignal.com/api/v1/notifications', notifOptions)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  }