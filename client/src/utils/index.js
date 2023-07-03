import { surpriseMePrompts } from '../constants/index';
import FileSaver from 'file-saver';

export function getRandomPrompts(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    const randomPrompt = surpriseMePrompts[randomIndex];

    return randomPrompt;
}

export async function downloadImg(_id, photo) {
    FileSaver.saveAs(photo, `${_id}.jpg`);

}
