import React from "react"
import './App.css'

import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom"

import { Landing, Product, Statistics } from "./Pages/index.js"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/inventory/:productID" element={<Product />}/>
				<Route path="/inventory" element={<Landing />}/>
				<Route path="/statistics" element={<Statistics />}/>
				<Route path="/" element={<Landing />}/>
			</Routes>
		</Router>
	)
}

export default App;
