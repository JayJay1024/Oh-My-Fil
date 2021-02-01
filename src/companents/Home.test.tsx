import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Home from './Home';
import store from '../store';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


describe('testing card', () => {
    test('there should be a Sectors Summary', () => {
        render(
            <Provider store={store}>
                <Router>
                    <DndProvider backend={HTML5Backend}>
                        <Home />
                    </DndProvider>
                </Router>
          </Provider>
        );
        expect(screen.getAllByText('Sectors Summary').length).toEqual(1);
    });
});
