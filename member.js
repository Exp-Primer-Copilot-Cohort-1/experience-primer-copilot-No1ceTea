function skillsMember() {
    var member = {
        name: 'John',
        skills: ['JavaScript', 'CSS', 'HTML']
    };

    console.log(member.name);
    console.log(member['name']);

    member.address = 'Seoul';
    console.log(member.address);

    delete member.address;
    console.log(member.address);

    delete member;
    console.log(member.name);
}