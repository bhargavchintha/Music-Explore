import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Login&Signup/Signup';
import Login from './Login&Signup/Login';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import About from './Components/About';
import Model from './Components/Model';
import Musicupload from './MusicUpload/Musicupload'
import profile from './Userprofile/profile';
import Uploadfiles from './Uploadfiles/Uploadfiles';
import Whiselist from './Whiselist/Whiselist';
import Cart from './AddToCart/Cart';
import Checkout from './CheckOut/Checkout'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Switch>
        <Route exact path='/Checkout' component={Checkout}/>
        <Route exact path='/Cart' component={Cart}/>
      <Route exact path='/Whiselist' component={Whiselist}/>
        <Route path="/Uploadfiles" component={Uploadfiles} />  
        <Route path="/profile" component={profile} />
        <Route path="/Musicupload" component={Musicupload} />
          <Route path="/Model" component={Model} />
          <Route path="/About" component={About} />
          <Route path="/search" render={(props) => (
            <Search {...props} searchQuery={searchQuery} />
          )} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
