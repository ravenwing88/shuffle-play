document.getElementById('shuffleButton').addEventListener('click', () => {
    const namesInput = document.getElementById('namesInput');
    const output = document.getElementById('output');

    // Reset output for new input
    output.textContent = '';

    // Split input into an array of names and filter out empty entries
    const names = namesInput.value.split(',').map(name => name.trim()).filter(name => name);
    const totalNames = names.length;

    // Validate input
    if (totalNames < 4) {
        output.textContent = 'Please enter at least 4 names.';
        return;
    }

    // Shuffle names using the Fisher-Yates algorithm
    for (let i = totalNames - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    const groups = [];
    let currentIndex = 0;

    // Calculate the best number of groups
    const minGroupSize = 4;
    const maxGroupSize = 7;

    // Calculate maximum group count based on total names
    let groupCount = Math.floor(totalNames / minGroupSize);
    while (true) {
        const groupSize = Math.ceil(totalNames / groupCount);
        if (groupSize <= maxGroupSize) {
            break;
        }
        groupCount++;
    }

    // Create groups while ensuring sizes are as even as possible
    while (currentIndex < totalNames) {
        const remainingNames = totalNames - currentIndex;
        const groupSize = Math.min(maxGroupSize, Math.max(minGroupSize, Math.ceil(remainingNames / (groupCount - groups.length))));
        
        groups.push(names.slice(currentIndex, currentIndex + groupSize));
        currentIndex += groupSize;
    }

    // Display output
    output.textContent = 'Generated Groups:\n' + groups.map((group, index) => 
        `Group ${index + 1}: ${group.join(', ')}`
    ).join('\n');
});