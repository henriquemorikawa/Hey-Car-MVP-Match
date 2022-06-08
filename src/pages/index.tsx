// import logo from ''
import Head from 'next/head'
import React from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Heycar</title>
      </Head>
      <main>
        <Navbar />
        <Dashboard />
        <Footer />
      </main>
    </>
  )
}
