import {NavLink, Outlet} from 'react-router-dom'
import React from "react"

function Register(){
    
    return(
    //     <div className="cont mt-5">
    //     <form >
    //       <div className="form sign-in" >
    //         <h2>Welcome back,</h2>
    //         <label>
    //           <span>Username</span>
    //           <input type="text" className="form-control" name="user" id="un" />
    //         </label>
    //         <label>
    //           <span>Password</span>
    //           <input type="password" className="form-control" name="password" id="pw" />
    //         </label>
    //         <a><p className="forgot-pass">Forgot password?</p></a>
    //         <button type="submit" className="submit">Sign In</button>
    //         <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
    //       </div>
    //     </form>
    //     <div className="sub-cont">
    //       <div className="img">
    //         <div className="img__text m--up">
    //           <h2>New here?</h2>
    //           <p>Sign up and discover great amount of new opportunities!</p>
    //         </div>
    //         <div className="img__text m--in">
    //           <h2>One of us?</h2>
    //           <p>If you already has an account, just sign in. We've missed you!</p>
    //         </div>
    //         <div className="img__btn">
    //           <span className="m--up">Sign Up</span>
    //           <span className="m--in">Sign In</span>
    //         </div>
    //       </div>
    //       <form>
    //         <div className="form sign-up">
    //           <h2>Time to feel like home,</h2>
    //           <label>
    //             <span>Name</span>
    //             <input type="text" className="form-control" name="user" id="un" />
    //           </label>
    //           <label>
    //             <span>Password</span>
    //             <input type="password" className="form-control" name="password" id="pw" />
    //           </label>
    //           <label>
    //             <span>Date Of Birth</span>
    //             <input type="date" className="form-control" name="dateOfBirth" id="dob" />
    //           </label>
    //           <label>
    //             <span>Email</span>
    //             <input type="email" className="form-control" name="mail" id="email" />
    //           </label>
    //           <button type="submit" className="submit">Sign Up</button>
    //           <button type="button" className="fb-btn">Join with <span>facebook</span></button>
    //         </div>
    //       </form>
          
    //     </div>
    //   </div>

    <div >
        <ul class="nav justify-content-center mt-3 mb-4">
                <li className="nav-item ">
                    <NavLink className="nav-link" to="donor">Donor</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="donee">Donee</NavLink>
                </li>
            </ul>

            {/*Placeholder to hold selected component */}
            <Outlet/>
    </div>      
    )
}

export default Register