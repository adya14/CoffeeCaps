import React from 'react';
import { Add } from "@material-ui/icons";
import "./css/SidebarOptions.css";

function SidebarOptions() {
    return (
      <div className="sidebarOptions">
        <div className="sidebarOption">
          <img
            src="https://st2.depositphotos.com/1867553/5964/v/600/depositphotos_59642867-stock-illustration-recipes-for-the-most-popular.jpg"
            alt=""
          />
          <p>Coffee Recipes</p>
        </div>
        <div className="sidebarOption">
        <img
          src="https://img.freepik.com/free-vector/pack-different-delicious-coffee-types_52683-39840.jpg"
          alt=""
        />

        <p>Types of coffee</p>
      </div>
      <div className="sidebarOption">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmVhbnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
        />
        <p>Coffee Beans</p>
      </div>

      <div className="sidebarOption">
        <Add />
        <p className="text">Discover Spaces</p>
      </div>
        </div>
    );
}

export default SidebarOptions;
