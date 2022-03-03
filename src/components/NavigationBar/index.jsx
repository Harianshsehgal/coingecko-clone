import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.css'


function NavigationBar() {
  return (
  
    <div className="nav ">
      <div className="navLeft">
        <ul className="navbarUlLeft navbarUl">
          <li>
          <Link to='/'>
          <img className='navImage' alt="CoinGecko Logo" width="140" height="39" src="https://static.coingecko.com/s/coingecko-logo-d13d6bcceddbb003f146b33c2f7e8193d72b93bb343d38e392897c3df3e78bdd.png"></img>
          </Link>
          </li>
          <li className="dropDownHover">
            <a href="#">Coins</a>
            <div className="dropDownMenu">
              <a className="dropdown-item " href="">
              Market Cap Rank
              </a>
              <a className="dropdown-item " href="">
              Recently Added
              </a>
              <a className="dropdown-item " href="">
              Categories New
              </a>
            </div>
          </li>

          <li className="dropDownHover">   
            <a href="#">Exchanges</a>
            <div className="dropDownMenu">
              <a className="dropdown-item " href="">
                Spot
              </a>
              <a className="dropdown-item " href="">
                DEX
              </a>
              <a className="dropdown-item " href="">
                Derivatives
              </a>
            </div>
          </li>
          <li>
            <a href="#">NFT</a>
          </li>
          <li>
            <a href="#">publications</a>
          </li>
          <li>
            <a href="#">Resources</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">GeckoCon 2022</a>
          </li>
        </ul>
      </div>
      <div className="navRight">
        <ul className="navbarUlRight navbarUl">
          <li><a>Portfolio</a></li>
          <li><a>Login</a></li>
          <li><a>Sign Up</a></li>
        </ul>
      </div>
    </div>
   
  );
}

export default NavigationBar;
