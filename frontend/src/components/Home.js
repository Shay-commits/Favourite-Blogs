import React from 'react'
import {Link} from 'react-router-dom'


const HomePage = () => {
  return (
    <div class="maincont">
      <div class="imagecont">
        <img src="https://purepng.com/public/uploads/large/purepng.com-white-paper-planpaper-planeaeroplanepaper-gliderpaper-dartaircraftfolded-paperpaperboardclipart-14215265881356kjut.png"></img>
      </div>
      <div class="contentcont">
        <div class="contentheading">
          <h3> Welcome</h3>
        </div>
        <div class="contenttext">
          <p> Welcome to the Bloglist, a collection of programming resources that have positively impacted our user's lifes. Users have the ability to view all blog links, make sure to like your favourite links. Blogs are listed in descending order of likes. Feel free to delete blogs that you adedd and feel no longer add value to your fellow member's lifes </p>
        </div>
        <div class="contentbutton">
          <button> <Link to="/blogs"> View Blogs </Link> </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage  