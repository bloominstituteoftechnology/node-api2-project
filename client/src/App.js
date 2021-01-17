import Home from './Home';
import {useHistory} from 'react-router-dom';
import {Button} from 'reactstrap';
import './App.css';

function App() {
  const history=useHistory();
  return (
    <div className="App">
       <h1>Welcome to Lambdagram!</h1>
       <Home/>
       <Button onClick={()=>{
                history.push('/home')}}>Let Go!
        </Button>
    </div>
  );
}

export default App;
