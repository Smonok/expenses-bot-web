import { ActivatedRoute } from "@angular/router";

export class RouteUtil {
    private constructor() { }

    public static correctPeriodForRequest(route: ActivatedRoute, periodPathParamName: string) {
        const pathPeriod = route.snapshot.paramMap.get(periodPathParamName) || '';

        switch (pathPeriod) {
            case 'one-year':
                return '1 year';
            case 'six-month':
                return '6 month';
            case 'thirty-days':
                return '30 days';
            case 'seven-days':
                return '7 days';
            default:
                return '100 year';
        }
    }
}