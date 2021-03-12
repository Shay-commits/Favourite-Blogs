import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// Blog renders test 
const initialTest = () => {

    // Remove button 
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  const user = JSON.parse(loggedUserJSON)

  const blogs = [ {
    _id: '5f8cafb82a1dd1d74772999d',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0,
    user: {
      blogs: [],
      _id: '5f8c26181250aecaee439d93',
      username: 'root',
      name: 'admin',
      password: '$2b$10$7M31hRdxjH6iNdiVKYlcpeOEkTWuHwO1tx3c5hyxIzRHfIe/jJ4vW',
      __v: 0
    },
    __v: 0
  },
  {
    _id: '5f8cafb82a1dd1d74772999e',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    user: {
      blogs: [],
      _id: '5f8c26181250aecaee439d93',
      username: 'root',
      name: 'admin',
      password: '$2b$10$7M31hRdxjH6iNdiVKYlcpeOEkTWuHwO1tx3c5hyxIzRHfIe/jJ4vW',
      __v: 0
    },
    __v: 0
  },
  {
    _id: '5f8cafb82a1dd1d74772999f',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      blogs: [],
      _id: '5f8c26181250aecaee439d93',
      username: 'root',
      name: 'admin',
      password: '$2b$10$7M31hRdxjH6iNdiVKYlcpeOEkTWuHwO1tx3c5hyxIzRHfIe/jJ4vW',
      __v: 0
    },
    __v: 0
  }]

  const component = render (
    blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  )

  const div = component.container.querySelector('.blogtest')

  component.debug()

  expect(div).toHaveTextContent('React patterns')
  expect(div).not.toHaveTextContent('https://reactpatterns.com/')

}

test('checks whether component only renders blog title and author', initialTest)

// Blog shows url when view button is clicked
const viewTest = () => {

    // Remove button 
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  const user = JSON.parse(loggedUserJSON)

  const blogs = [ {
    _id: '5f8cafb82a1dd1d74772999d',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0,
    user: {
      blogs: [],
      _id: '5f8c26181250aecaee439d93',
      username: 'root',
      name: 'admin',
      password: '$2b$10$7M31hRdxjH6iNdiVKYlcpeOEkTWuHwO1tx3c5hyxIzRHfIe/jJ4vW',
      __v: 0
    },
    __v: 0
  },]

  const component = render (
    blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  )
  

  const div = component.container.querySelector('.newtest')
  const button = component.getByText('view')
  fireEvent .click(button)

  expect(div).toHaveTextContent('https://reactpatterns.com/')

}





test('blog view when button is clicked', viewTest)
