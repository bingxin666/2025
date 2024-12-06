// functions/next-lunar-new-year.js
import { lunar2solar } from 'solarlunar/lib/solarlunar.min.js';

function getLunarNewYearDate(year) {
    const solarDate = lunar2solar(year, 1, 1);
    return `${solarDate.cYear}/${solarDate.cMonth}/${solarDate.cDay}`;
}

function getNextLunarNewYear(currentDate) {
    const currentYear = currentDate.getFullYear();
    for (let year = currentYear; year <= 2100; year++) {
        const lunarNewYearDate = new Date(getLunarNewYearDate(year));
        if (lunarNewYearDate > currentDate) {
            return getLunarNewYearDate(year);
        }
    }
    return '日期超出范围';
}

export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    if (!date) {
        return new Response('日期格式错误', { status: 400 });
    }

    const currentDate = new Date(date);
    if (isNaN(currentDate)) {
        return new Response('无效的日期', { status: 400 });
    }

    const nextLunarNewYear = getNextLunarNewYear(currentDate);
    return new Response(JSON.stringify({ nextLunarNewYear }), {
        headers: { 'Content-Type': 'application/json' },
    });
}