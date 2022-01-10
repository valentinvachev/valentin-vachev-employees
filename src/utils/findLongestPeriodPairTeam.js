const findLongestPeriodPairTeam = (text) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employeesWorkingInfo = constructEmployeeArrayByText(text, today);
    employeesWorkingInfo.sort(
        (emp1, emp2) => Number(emp1.id) - Number(emp2.id)
    );

    const totalHoursWorkedTogether = {};
    const employeesWorkingHoursByProjects = {};
    let highestWorkingTime = 0;
    let firstEmployeePairId = -1;
    let secondEmployeePairId = -1;

    for (
        let bsElIndex = 0;
        bsElIndex < employeesWorkingInfo.length;
        bsElIndex++
    ) {
        const {
            id: baseElId,
            projectId: baseElProjectId,
            dateFrom: baseElDateFrom,
            dateTo: baseElDateTo,
        } = employeesWorkingInfo[bsElIndex];

        const baseElDateFromTime = baseElDateFrom.getTime();
        const baseElDateToTime = baseElDateTo.getTime();

        for (
            let comparedElIndex = bsElIndex + 1;
            comparedElIndex < employeesWorkingInfo.length;
            comparedElIndex++
        ) {
            const {
                id: comparedElId,
                projectId: comparedElProjectId,
                dateFrom: comparedElDateFrom,
                dateTo: comparedElDateTo,
            } = employeesWorkingInfo[comparedElIndex];

            const comparedElDateFromTime = comparedElDateFrom.getTime();
            const comparedElDateToTime = comparedElDateTo.getTime();

            if (
                baseElId !== comparedElId &&
                baseElProjectId === comparedElProjectId &&
                baseElDateFromTime <= comparedElDateToTime &&
                baseElDateToTime >= comparedElDateFromTime
            ) {
                const laterStartDate =
                    comparedElDateFromTime > baseElDateFromTime
                        ? comparedElDateFrom
                        : baseElDateFrom;

                const soonerEndDate =
                    comparedElDateToTime < baseElDateToTime
                        ? comparedElDateTo
                        : baseElDateTo;

                const diffTime = Math.abs(laterStartDate - soonerEndDate);
                const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (totalHoursWorkedTogether.hasOwnProperty(baseElId)) {
                    if (
                        totalHoursWorkedTogether[baseElId].hasOwnProperty(
                            comparedElId
                        )
                    ) {
                        const currentWorkingHours =
                            totalHoursWorkedTogether[baseElId][comparedElId];

                        const newWorkingHours =
                            currentWorkingHours + diffInDays;

                        totalHoursWorkedTogether[baseElId][comparedElId] =
                            newWorkingHours;

                        if (newWorkingHours > highestWorkingTime) {
                            highestWorkingTime = newWorkingHours;
                            firstEmployeePairId = baseElId;
                            secondEmployeePairId = comparedElId;
                        }

                        employeesWorkingHoursByProjects[baseElId][comparedElId][
                            baseElProjectId
                        ] = diffInDays;
                    } else {
                        totalHoursWorkedTogether[baseElId][comparedElId] =
                            diffInDays;

                        employeesWorkingHoursByProjects[baseElId][
                            comparedElId
                        ] = {
                            [baseElProjectId]: diffInDays,
                        };

                        if (diffInDays > highestWorkingTime) {
                            highestWorkingTime = diffInDays;
                            firstEmployeePairId = baseElId;
                            secondEmployeePairId = comparedElId;
                        }
                    }
                } else {
                    totalHoursWorkedTogether[baseElId] = {};
                    totalHoursWorkedTogether[baseElId][comparedElId] =
                        diffInDays;

                    employeesWorkingHoursByProjects[baseElId] = {
                        [comparedElId]: {
                            [baseElProjectId]: diffInDays,
                        },
                    };

                    if (diffInDays > highestWorkingTime) {
                        highestWorkingTime = diffInDays;
                        firstEmployeePairId = baseElId;
                        secondEmployeePairId = comparedElId;
                    }
                }
            }
        }
    }

    return {
        firstEmployeeId: firstEmployeePairId,
        secondEmployeeId: secondEmployeePairId,
        projects:
            firstEmployeePairId != -1 && secondEmployeePairId && -1
                ? employeesWorkingHoursByProjects[firstEmployeePairId][
                      secondEmployeePairId
                  ]
                : {},
    };
};

const constructEmployeeArrayByText = (text, today) => {
    const employeesWorkingInfo = [];

    text.split(/\r\n/)
        .filter((v) => v.length && v.substring(0, 3) !== 'Emp')
        .forEach((line) => {
            const [id, projectId, dateFromRawData, dateToRawData] = line
                .replaceAll(/\s/g, '')
                .split(',');

            const dateFrom =
                dateFromRawData === 'NULL'
                    ? today
                    : new Date(splitRawData(dateFromRawData));

            const dateTo =
                dateToRawData === 'NULL'
                    ? today
                    : new Date(splitRawData(dateToRawData));

            employeesWorkingInfo.push({
                id,
                projectId,
                dateFrom,
                dateTo,
            });
        });

    return employeesWorkingInfo;
};

const splitRawData = (rawDate) => {
    if (rawDate.includes('/')) {
        return rawDate.split('/');
    } else if (rawDate.includes('|')) {
        return rawDate.split('|');
    } else if (rawDate.includes('T')) {
        return rawDate.substring(0, 10).split('-');
    } else {
        return rawDate.split('-');
    }
};

export default findLongestPeriodPairTeam;
