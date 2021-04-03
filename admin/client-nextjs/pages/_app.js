import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';


function MyApp({ Component, pageProps }) {
  return (
    <Container fluid>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
