import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Home from './Home';
import store from '../store';
import { selectSectorsSummary } from '../reducers/sectorsSummarySlice';


describe('testing card', () => {
    test('there should be a Sectors Summary', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
          </Provider>
        );
        expect(screen.getAllByText('Sectors Summary').length).toEqual(1);
    });
});
