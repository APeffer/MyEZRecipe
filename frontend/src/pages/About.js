import React from 'react'

const About = () => {
  return (
    <div className='about-container'>
        <h1>About MyEZRecipe</h1>
        <p>
          This is a personal/learning project that I wanted to make to help grow my breadth and depth of knowledge.
          After completing a tutorial or two and learning about Node.js and Express.js I wanted to combine it with my prior self-taught frontend React knowledge to create a full-stack application.
        </p>
        <br/>
        <h2>How it works:</h2>
        <p>
          A user can sign in or log in and will be able to create, read, update, or delete any personal recipe that they enjoy making.
          A recipe consists of an author, title, a list of ingredients with their amounts, and a description or instructions on how to make it.
          Recipes will all have an individual ID so that you can link a recipe to a friend!
        </p>
        <br/>
        <h2>The Goal:</h2>
        <p>
          For now a user will only be able to see recipes they have uploaded, but the final goal with this project is to make it so you can look up another person's profile to see their recipes.
        </p>
        <br/>
        <h2>Takeaways:</h2>
        <p>
          Diving into this project I hoped to gain knowledge about backend web development and where it fits into a final project, but I ended up learning so much more. I learned how to use a NoSQL database MongoDB, 
          Docker for containerization, and basic knowledge of deployment, troubleshooting CORS issues, as well as improving my knowledge of react with hooks and contexts. Additionally, I learned about JSON web tokens
          and BCrypt to hash and encrypt passwords to create a secure login/signup process.
        </p>
    </div>
  )
}

export default About