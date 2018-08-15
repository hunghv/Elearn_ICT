import { BreadscrumbItem } from '../models/breadscrumb/breadscrumb-item.model';

export const BreadscrumbConstants: BreadscrumbItem[] = [
    {
        name: 'OPU AAP',
        url: '/web/annual-assurance-plan'
    },
    {
        name: 'Dept AAP',
        url: '/web/annual-assurance-plan/dept-aap-detail'
    },
    {
        name: 'Dept AAP Item',
        url: '/web/annual-assurance-plan/assurance-plan'
    },
    {
        name: 'AP',
        url: '/web/annual-assurance-plan/assurance-plan'
    },
    {
        name: 'Checklist Detail',
        url: '/web/annual-assurance-plan/assurance-plan/checklist-detail'
    },
    {
        name: 'Findings Detail',
        url: '/web/annual-assurance-plan/assurance-plan/findings-item-detail'
    },
    {
        name: 'Action Item Detail',
        url: '/web/annual-assurance-plan/assurance-plan/action-item-detail'
    },
];

export enum BreadscrumbConstantsIndex {
    OPU_AAP,
    DEPT_AAP,
    DEPT_AAP_ITEM,
    AP,
    CHECKLIST,
    FINDINGS,
    ACTION_ITEM
}
