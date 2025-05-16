import React from 'react'
import CategoryList from '../components/CategoryList'
import Banner from '../components/Banner'
import HorizontalProductDisplayCard from '../components/HorizontalProductDisplayCard'
import VerticalProductDisplayCard from '../components/VerticalProductDisplayCard'

const Home = () => {
  return (
    <div className='mx-4'>
      <CategoryList />
      <Banner />

      <HorizontalProductDisplayCard category={"airpodes"} heading={"Airpodes"}/>
      <HorizontalProductDisplayCard category={"watches"} heading={"Watches"}/>

      <VerticalProductDisplayCard category={"mobiles"} heading={"Mobiles"}/>
      <VerticalProductDisplayCard category={"earphones"} heading={"Earphones"}/>
      <VerticalProductDisplayCard category={"televisions"} heading={"Televisions"}/>
      <VerticalProductDisplayCard category={"trimmers"} heading={"Trimmers"}/>
      <VerticalProductDisplayCard category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalProductDisplayCard category={"camera"} heading={"Camera"}/>
      <VerticalProductDisplayCard category={"printers"} heading={"Printers"}/>
      <VerticalProductDisplayCard category={"processor"} heading={"Processor"}/>
      <VerticalProductDisplayCard category={"speakers"} heading={"Speakers"}/>
      <VerticalProductDisplayCard category={"Mouse"} heading={"Mouse"}/>
    </div>
  )
}

export default Home