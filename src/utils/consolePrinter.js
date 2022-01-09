const consolePrinter = (data) => {
    console.log(
        `${whiteSpaceAndLineCreator(
            'Employee ID #1'
        )}${whiteSpaceAndLineCreator(
            'Employee ID #2'
        )}${whiteSpaceAndLineCreator('Project ID')}${whiteSpaceCreator(
            'Days Worked'
        )}`
    );

    Object.keys(data.projects).forEach((proj) =>
        console.log(
            `${whiteSpaceAndLineCreator(
                data.firstEmployeeId
            )}${whiteSpaceAndLineCreator(
                data.secondEmployeeId
            )}${whiteSpaceAndLineCreator(proj)}${whiteSpaceCreator(
                data.projects[proj]
            )}`
        )
    );
};

const whiteSpaceAndLineCreator = (word) => {
    return word + ' '.repeat(17 - word.length) + '|';
};

const whiteSpaceCreator = (word) => {
    return word + ' '.repeat(18 - word.length);
};

export default consolePrinter;
