import React from 'react'
import RotatingText from './ui/ReactBIt/Rotatedtext'

const TopBar = () => {
  return (
    <div className=' overflow-hidden'>
          <RotatingText
    texts={[
      "StackWave — Ask, Answer, Learn, and Grow Together Every Day.",
      "Got Questions? StackWave Delivers Answers, Fast and Smart.",
      "Level Up Your Skills by Helping Others Solve Problems.",
      "Ride the StackWave: From Curiosity to Clarity in Code.",
      "Every Question Matters — Knowledge Shared, Community Grows Stronger.",
      "Debug Better, Discuss More, Learn Faster, Earn Points Daily.",
      "Smart Minds Meet Here. Ask Freely, Answer Boldly, Repeat.",
      "Code Confidently — Help Is Just a Wave Away.",
      "StackWave Rewards You for Sharing, Solving, and Supporting Others.",
      "Turn Confusion Into Confidence With Every Wave of Knowledge.",
    ]}
    mainClassName=" px-2 md:px-3  text-sky-400 text-center  md:text-xs  text-[10px] overflow-hidden  py-1 md:py-2  justify-center  bg-slate-800 "
    staggerFrom={"last"}
    initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: "-100%", opacity: 0 }}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 300 }}
  rotationInterval={2000} // slower interval for smoother transition
  /> </div>
  )
}

export default TopBar