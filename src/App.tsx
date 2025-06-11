import './tailwind.css';
import './utility.css';
import './shopping-styles.css';
import ShoppingPage from './redux/shopping-app/ShoppingPage';

function App() {
  return (
    <div className='w-full min-h-screen'>
      <ShoppingPage />
    </div>
  );
}

export default App;
