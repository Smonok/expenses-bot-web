export class DateUtil {
    private constructor() { }

    public static formatedDateByMonthYear(monthYear: string): string {
        if (!monthYear.includes('.')) {
            return '';
        }

        var dotIndex = monthYear.lastIndexOf('.');
        const year = monthYear.substring(dotIndex + 1);
        const monthNumber = parseInt(monthYear.substr(0, dotIndex));
        const month = this.monthNameByNumber(monthNumber);

        return month + ', ' + year;
    }

    public static monthNameByNumber(num: number): string {
        var monthNames = ['Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'];

        return monthNames[num - 1];
    }
}