import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInputGroup, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane
} from 'mdb-react-ui-kit';

export default function LoginRegister() {

  const [loginRegisterActive, setLoginRegisterActive] = useState('login')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    profession: '',
    graduation_year: '',
    institute: '',
    stream: '',
  });

  const handleLoginRegisterClick = (current) => {
    if(current === 'register') setLoginRegisterActive('register')
    else setLoginRegisterActive('login')
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
    <div className='col-md-4 mt-5'>
      <MDBTabs pills justify md='3'>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('login')}
            active={loginRegisterActive === 'login'}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('register')}
            active={loginRegisterActive === 'register'}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={loginRegisterActive === 'login'}>
          <form>
            <div className='text-center mb-3'>
              <p>Sign up with:</p>

              <MDBBtn floating color="secondary" className='mx-1'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>

              <MDBBtn floating color="secondary" className='mx-1'>
                <MDBIcon fab icon='google' />
              </MDBBtn>

              <MDBBtn floating color="secondary" className='mx-1'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>

              <MDBBtn floating color="secondary" className='mx-1'>
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </div>

            <p className='text-center'>or:</p>

            <MDBInput className='mb-4' type='email' id='form7Example1' label='Email address' />
            <MDBInput className='mb-4' type='password' id='form7Example2' label='Password' />

            <MDBRow className='mb-4'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox id='form7Example3' label='Remember me' defaultChecked />
              </MDBCol>
              <MDBCol>
                <a href='#!'>Forgot password?</a>
              </MDBCol>
            </MDBRow>

            <MDBBtn type='submit' className='mb-4' block>
              Sign in
            </MDBBtn>

            <div className='text-center'>
              <p onClick={() => handleLoginRegisterClick('register')}>
                Not a member? <a>Register</a>
              </p>
            </div>
          </form>
        </MDBTabsPane>
        <MDBTabsPane show={loginRegisterActive === 'register'}>
          <form>
            <div className='text-center mb-3'>
              <p>Register and Compete Now!</p>
            </div>

            <MDBInput className='mb-4' id='form8Example2' label='Username' name='username' value={formData.username} onChange={handleChange} />
            <MDBInput className='mb-4' id='form8Example1' label='Name' name='name' value={formData.name} onChange={handleChange} />
            <MDBInput className='mb-4' id='form8Example6' label='Profession' name='profession' value={formData.profession} onChange={handleChange} />
            <MDBInputGroup>
                <MDBInput className='mb-4' id='form8Example7' disabled label='Institute' name='institute' value={formData.institute} onChange={handleChange} />
                <select name="institute" value={formData.institute} onChange={handleChange} required>
                  <option value="">--Select Institute--</option>
                  <option value="PTU">PTU</option>
                  <option value="SMVEC">SMVEC</option>
                  <option value="MIT">MIT</option>
                  <option value="Others">Others</option>
                </select>
            </MDBInputGroup>
            <MDBRow className='align-items-center mb-4'>
                <MDBInput className='mb-4' wrapperClass='col-auto' id='form8Example7' label='Institute' name='institute' value={formData.institute} onChange={handleChange} />
                <MDBCol size="auto">
                    <select name="institute" value={formData.institute} onChange={handleChange} required>
                        <option value="">--Select Institute--</option>
                        <option value="PTU">PTU</option>
                        <option value="SMVEC">SMVEC</option>
                        <option value="MIT">MIT</option>
                        <option value="Others">Others</option>
                    </select>
                </MDBCol>
            </MDBRow>
            
            <MDBInput className='mb-4' id='form8Example8' label='Stream' name='stream' value={formData.stream} onChange={handleChange} />
            <MDBInput className='mb-4' id='form8Example9' label='Graduation year' name='graduation_year' value={formData.graduation_year} onChange={handleChange} />
            <MDBInput className='mb-4' type='password' id='form8Example4' label='Password' name='password' value={formData.password} onChange={handleChange} />

            <MDBCheckbox
              wrapperClass='d-flex justify-content-center mb-4'
              id='form8Example6'
              label='I have read and agree to the terms'
              defaultChecked
            />

            <MDBBtn type='submit' className='mb-4' block>
              Sign in
            </MDBBtn>

            
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
    </div>
  );
}