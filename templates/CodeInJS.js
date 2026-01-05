// Loop through all incoming rows from Google Sheets
items.forEach(item => {
    // Read marks from form
    const physics = parseFloat(item.json['Physics Marks'] || 0);
    const chemistry = parseFloat(item.json['Chemistry Marks'] || 0);
    const computer = parseFloat(item.json['Computer Marks'] || 0);
    const nepali = parseFloat(item.json['Nepali Marks'] || 0);
    const english = parseFloat(item.json['English Marks'] || 0);
    const social = parseFloat(item.json['Social Marks'] || 0);

    // Assign subject marks to HTML placeholders
    item.json['physics_marks'] = physics;
    item.json['chemistry_marks'] = chemistry;
    item.json['computer_marks'] = computer;
    item.json['nepali_marks'] = nepali;
    item.json['english_marks'] = english;
    item.json['social_marks'] = social;

    // Calculate GPA (assuming 100 marks scale mapped to 4 GPA)
    const gpas = [physics, chemistry, computer, nepali, english, social].map(m => (m / 100) * 4);
    const averageGPA = gpas.reduce((a, b) => a + b, 0) / gpas.length;
    item.json['gpa'] = parseFloat(averageGPA.toFixed(2));

    // Assign grade based on Nepal +2 grading system
    let grade = '';
    if (averageGPA >= 3.6) grade = 'A+';
    else if (averageGPA >= 3.2) grade = 'A';
    else if (averageGPA >= 2.8) grade = 'B+';
    else if (averageGPA >= 2.4) grade = 'B';
    else if (averageGPA >= 2.0) grade = 'C+';
    else if (averageGPA >= 1.6) grade = 'C';
    else grade = 'D';
    item.json['grade'] = grade;

    // Assign result based on minimum GPA
    const isPass = gpas.every(m => m >= 1.6); // below 1.6 = fail
    item.json['result'] = isPass ? 'Pass' : 'Fail';

    // Map other placeholders from form
    item.json['rank'] = item.json['Rank'] || '';
    item.json['attendance'] = item.json['Attendance'] || '';
    item.json['issue_date'] = item.json['Issue Date'] || '';

    // Map header fields
    item.json['student_name'] = item.json['Student Name'] || '';
    item.json['registration_no'] = item.json['Registration Number'] || '';
    item.json['date_of_birth'] = item.json['Date of Birth'] || '';
    item.json['symbol_no'] = item.json['Symbol Number'] || '';
    item.json['exam_year'] = item.json['Annual Examination Year'] || '';
    
    // Split Conducted In field to BS and AD
    if (item.json['Conducted In (BS Year / AD Year)']) {
        const parts = item.json['Conducted In (BS Year / AD Year)'].split('/');
        item.json['bs_year'] = parts[0].trim();
        item.json['ad_year'] = parts[1] ? parts[1].trim() : '';
    } else {
        item.json['bs_year'] = '';
        item.json['ad_year'] = '';
    }
});

// Return processed rows
return items;
