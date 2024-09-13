

import { proxy } from "valtio";
import { StoreType } from "../helpers/types";

export const store = proxy<StoreType>({
    damping: false,
    selectedAnnotation: null,
    config: {
        'M4A1-S': [
            {
                position: [ -85, 5.5, 10],
                title: "M4A1-S view 1",
                dofTarget: [ -75, 2, 3 ]
            },
            {
                position: [ 18, 10, -10],
                title: "M4A1-S view 2",
                dofTarget: [ 8, 2, -3 ]
            },
            {
                position: [ 9, -10, 15],
                title: "M4A1-S view 3",
                dofTarget: [ 8.3, -3.9, 2.1 ]
            },
            {
                position: [ 60, 5.5, -10],
                title: "M4A1-S view 4",
                dofTarget: [ 45, 1, -2 ]
            },
        ],
        'Desert eagle': [
            {
                position: [ -35, 5.5, 10],
                title: "de view 1",
                dofTarget: [ -20, 2, 1 ]
            },
            {
                position: [ 18, 10, -10],
                title: "de view 2",
                dofTarget: [ 6, 3, -2 ]
            },
            {
                position: [ 9, -10, 15],
                title: "de view 3",
                dofTarget: [ 1, 1, 1 ]
            },
        ],
        'USP-S': [
            {
                position: [ -55, 5.5, 12],
                title: "USP-S view 1",
                dofTarget: [ -40, 5, 2 ]
            },
            {
                position: [ 18, 10, -10],
                title: "USP-S view 2",
                dofTarget: [ 7, 5, -2 ]
            },
            {
                position: [ 9, -10, 15],
                title: "USP-S view 3",
                dofTarget: [ 9, -9, 2 ]
            },
        ]
    
    }
});

export const setDampingMode = (mode: boolean) => store.damping = mode;
export const selectAnnotation = (select: string | null) => store.selectedAnnotation = select;