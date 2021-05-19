import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'

const ThemeDecorator = storyFn => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={{}}>{storyFn()}</ThemeProvider>
  </StylesProvider>
) 

export default ThemeDecorator