//premium content / subscribe button now animated, it transition between the two( or any ) in 5 seconds
function ChangingTextButton() {
    const [buttonText, setButtonText] = useState('Premium content');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setButtonText(buttonText === 'Premium content' ? 'Subscribe' : 'Premium content');
      }, 5000); // Change text every 5 seconds
  
      return () => clearInterval(intervalId); // Cleanup function
    }, []);
  
    return (
      <button className="homeButton">{buttonText}</button>
    );
  }
  export default ChangingTextButton;