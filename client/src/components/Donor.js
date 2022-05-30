import {useForm} from 'react-hook-form'
//import './Donor.css'
function Donor({onFormSubmit}){
    const {register,handleSubmit,formState:{errors}}=useForm()
    return(
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-body">
              <div className="username">
                  <label className="form__label" htmlFor="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" placeholder="First Name" {...register("fn",{required:true})}/>
                  {errors.fn?.type==="required" && <p className="text-danger">* Enter name</p>}
              </div>
              <div className="lastname">
                  <label className="form__label" htmlFor="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName" {...register("ln",{required:true})}/>
                  {errors.ln?.type==="required" && <p className="text-danger">* Enter lastname</p>}
              </div>
              <div className="email">
                  <label className="form__label" htmlFor="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email" {...register("email",{required:true})}/>
                  {errors.email?.type==="required" && <p className="text-danger">* Enter email</p>}
              </div>
              <div className="password">
                  <label className="form__label" htmlFor="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password" {...register("pw",{required:true})}/>
                  {errors.pw?.type==="required" && <p className="text-danger">* Enter password</p>}
              </div>
              <div className="confirm-password">
                  <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password" {...register("rpw",{required:true})}/>
                  {errors.rpw?.type==="required" && <p className="text-danger">* Enter password</p>}
              </div>
          </div>
          <div className="footer">
              <button type="submit" className="btn btn-success">Register</button>
          </div>
          </form>
        </div>
    )
}
export default Donor