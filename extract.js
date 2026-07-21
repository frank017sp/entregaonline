const fs = require('fs');

const data = fs.readFileSync('C:/Users/franklin/.gemini/antigravity/brain/81fd1ceb-ea75-41e6-9024-fab80812c62e/.system_generated/logs/transcript_full.jsonl', 'utf-8');
const lines = data.split('\n');

let output = '';

for (const line of lines) {
    if (!line) continue;
    const obj = JSON.parse(line);
    if (obj.step_index === 276 && obj.tool_calls) {
        output += "HTML TARGET CONTENT:\n";
        for (const chunk of obj.tool_calls[0].args.ReplacementChunks) {
            output += chunk.TargetContent + "\n================\n";
        }
    }
}

fs.writeFileSync('old_content_utf8.txt', output, 'utf-8');
