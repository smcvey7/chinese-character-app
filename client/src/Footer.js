import React from "react";

function Footer(){

  return(
    <div id="footer" className="footer">
      <footer className="d-flex flex-row justify-content-between">
        <div>
          Contact:<a href="mailto:info@chinesecharactertest.com">info@chinesecharactertest.com</a><br/>
        </div>
        <div>
          <strong>If you love the Chinese Character Test</strong><br/>
          <a href="https://pay.chinesecharactertest.com" target="_blank" rel="noopener noreferrer"><button>Show your support!</button></a>
        </div>
        <div>
          <p>© 2023 Chinese Character Test. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer;