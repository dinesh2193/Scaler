import React from 'react'
import MovieList from './MovieList'
import TheatreTable from './TheatreTable'
import { Tabs } from 'antd'

function Admin() {
	const tabItems = [
		{ key: "1", label: "Movies", children: <MovieList /> },
		{ key: "2", label: "Theatres", children: <TheatreTable /> }
	]


  return (
    <div>
      <h1>Admin</h1>
			<Tabs items={tabItems} />
    </div>
  )
}

export default Admin
