import './App.css';
import HomePage from './components/HomepPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51JQfBlEhLp6Y8JSziEexUXjlMDCpoAgfLYOoLCx0N4UTmTMxJo5wwL7TZWmwIfURuruyThOljJpN7PqB6FMIQ0v000rUpUdpUy");

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <HomePage />
      </Elements>
    </div>
  );
}

export default App;
