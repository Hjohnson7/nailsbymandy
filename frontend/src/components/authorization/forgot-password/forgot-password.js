import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Nikkis Site
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPasswordSide(props) {

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
				<div class="col-12">
					<ul class="actions">
						<li><input type="submit" value="Send Reset Email" class="primary" /></li>
					</ul>
          <ul class="actions">
            <li><Link to="/login" variant="body2">{"Sign In"}</Link></li>
            <li><Link to="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link></li>
					</ul>
				</div>
			</div>
		</form>
  );
}