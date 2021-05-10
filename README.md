# iq96_server

Server for iq96-client

#### needed config files

  **.env:**

	DATABASE_URL_DEVELOPMENT=
	DATABASE_URL_PRODUCTION=
	CORS_ORIGIN=

**/src/config/devPages.js:**

	const devPages: any[] = [];
	devPages.push([
		'http://localhost:3000',
		'http://localhost:4000',
		undefined,
		<other pages>,
	]);
	export default devPages;

**serviceAccountKey.json:** from firebase account

	{
	"type": "service_account",
	"project_id": "<project_id>",
	"private_key_id": "<private_key_id>",
	"private_key": "-----BEGIN PRIVATE KEY-----<key>-----END PRIVATE KEY-----\n",
	"client_email": "<client_email>",
	"client_id": "<client_id>",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
  	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "<client_x509_cert_url>"
	}


TODO:
 - createUser doesnt include Roles when creating new user.
 - Error catching when Creating and updating user.
