import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';



export default function SignInSide(props) {

  return (
    <form method="post" action="#" noValidate onSubmit={e => props.onSubmit(e)} sx={{ mt: 1 }}>
			<div class="row gtr-uniform">
				<div class="col-12 col-12-xsmall">
        <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={props.email}
                onChange={e => props.onChange(e)}
              />
				</div>
				<div class="col-12 col-12-xsmall">
        <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={props.password}
                onChange={e => props.onChange(e)}
              />
				</div>
				<div class="col-12">
					<ul class="actions">
						<li><input type="submit" value="Sign In" class="primary" /></li>
					</ul>
          <ul class="actions">
            <li> <Link to="/reset-password" variant="body2">Forgot password?</Link> </li> 
            <li><Link to="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link></li>
					</ul>
				</div>
			</div>
		</form>

  );
}