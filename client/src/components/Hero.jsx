
import spiderman from '../assets/Spider-Man.jpg'
import { useTypewriter , Cursor} from 'react-simple-typewriter'
// import Typed from 'react-typed'


function Hero() {
    const [texts]   = useTypewriter({
        words:[' Sentiments' , ' Ratings!'],
        loop: {}
    });
    return (
        <div className='text-white '>

          <div className='w-full h-screen'>
            <img className='w-full h-screen object-cover ' src={spiderman} alt="" />
            <div className='bg-black/70 w-full h-screen absolute top-0 left-0'  />
        </div>  
           
            
        <div className='mt-[0px] px-5 w-full h-screen mx-auto text-center flex flex-col justify-center items-center gap-1 absolute top-0 left-0'>
       
            <p className='uppercase md:text-6xl sm:text-5xl text-4xl font-bold md:py-6'>The Movie Rating System</p>
            <p className='md:text-2xl sm:text-xl text-sm '>Capturing the Heartbeats of Cinema</p>
            <div className='flex justify-center items-center'>
                <p className='md:text-2xl sm:text-xl text-sm font-bold'> Your </p>
                <span style={{marginLeft:'5px'}} className='md:text-2xl sm:text-xl text-sm font-bold'>{texts}</span>
                <span >
                <Cursor/>
                </span>
                
                {/* <Typed className='pl-1 md:text-2xl sm:text-xl text-sm font-bold' strings={['Sentiments' ,'Ratings!' ]} typeSpeed={40} backSpeed={50} loop  />  */}
            </div>
            <button className='bg-[#ff5100] w-[150px] rounded-full mx-auto py-2 font-bold mt-3 hover:bg-[#c63600]'>Get Started</button>
        </div>
        </div>
        
    );
}

export default Hero;