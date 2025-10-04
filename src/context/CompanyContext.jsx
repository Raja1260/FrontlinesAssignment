import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import axios from 'axios'

const CompanyContext = createContext(null)

const initialState = {
  companies: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    location: 'All',
    industry: 'All',
    sortBy: 'name_asc'
  },
  page: 0,
  rowsPerPage: 10
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_COMPANIES':
      return { ...state, companies: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload }, page: 0 }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_ROWS':
      return { ...state, rowsPerPage: action.payload, page: 0 }
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: { ...initialState.filters }, // reset filters to initial values
        page: 0
      }
    default:
      return state
  }
}

export function CompanyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let mounted = true
    const fetchCompanies = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const res = await axios.get('http://localhost:5000/companies') // file in public
        if (!mounted) return
        dispatch({ type: 'SET_COMPANIES', payload: res.data })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed to load' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    fetchCompanies()
    return () => { mounted = false }
  }, [])

  // compute derived lists (unique locations/industries)
  const locations = useMemo(() => {
    const set = new Set(state.companies.map(c => c.location))
    return ['All', ...Array.from(set).sort()]
  }, [state.companies])

  const industries = useMemo(() => {
    const set = new Set(state.companies.map(c => c.industry))
    return ['All', ...Array.from(set).sort()]
  }, [state.companies])

  // filtered + sorted companies memoized
  const processed = useMemo(() => {
    const { search, location, industry, sortBy } = state.filters
    const s = search.trim().toLowerCase()

    let list = state.companies.slice()

    if (s) {
      list = list.filter(c => (
        c.name.toLowerCase().includes(s) ||
        (c.description && c.description.toLowerCase().includes(s)) ||
        (c.website && c.website.toLowerCase().includes(s))
      ))
    }

    if (location && location !== 'All') {
      list = list.filter(c => c.location === location)
    }

    if (industry && industry !== 'All') {
      list = list.filter(c => c.industry === industry)
    }

    // sorting
    const [key, dir] = sortBy.split('_')
    list.sort((a, b) => {
      const A = (a[key] || '').toString().toLowerCase()
      const B = (b[key] || '').toString().toLowerCase()
      if (A < B) return dir === 'asc' ? -1 : 1
      if (A > B) return dir === 'asc' ? 1 : -1
      return 0
    })

    return list
  }, [state.companies, state.filters])

  const paginated = useMemo(() => {
    const start = state.page * state.rowsPerPage
    return processed.slice(start, start + state.rowsPerPage)
  }, [processed, state.page, state.rowsPerPage])

  const value = {
    ...state,
    dispatch,
    locations,
    industries,
    processed,
    paginated
  }

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
}

export default CompanyContext