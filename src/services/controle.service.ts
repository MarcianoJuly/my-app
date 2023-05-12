import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataClient } from 'src/app/components/first-component/dataClient';


@Injectable({
  providedIn: 'root'
})

export class ControleService {
  allDataClients: DataClient[] = []
  editDataClient!: DataClient;

  constructor() { }
  
  save(newData: DataClient){
    this.allDataClients.push(newData);
  }

  delete(index: number){
    this.allDataClients.splice(index, 1);
  }

  getData(index: number){
    this.editDataClient = this.allDataClients[index];
    this.delete(index);
  }

  saveBack(){
    this.allDataClients.push(this.editDataClient);
  }

  searsh(input: string): DataClient[]{
    let searshData: DataClient[] = [];

    for(const data of this.allDataClients){
      const distanceCpf: number = this.levenshteinDistance(input, data.cpfClient); // Calcula a distância de Levenshtein
      const similarityCpf: number = 1 - distanceCpf / Math.max(input.length, data.cpfClient.length); // Calcula a similaridade

      const distanceName: number = this.levenshteinDistance(input, data.name); // Calcula a distância de Levenshtein
      const similarityName: number = 1 - distanceName / Math.max(input.length, data.name.length); // Calcula a similaridade

      if ((similarityName | similarityCpf) >= 0.5) {
        searshData.push(data);
      }
    }
    return searshData;
  }

  
  levenshteinDistance(s1: string, s2: string): number {
    const m: number = s1.length;
    const n: number = s2.length;
    const d: number[][] = [];

    for (let i = 0; i <= m; i++) {
      d[i] = [];
      d[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        if (s1[i - 1] === s2[j - 1]) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(
            d[i - 1][j] + 1,  // Deletar
            d[i][j - 1] + 1,  // Inserir
            d[i - 1][j - 1] + 1,  // Substituir
          );
        }
      }
    }

    return d[m][n];
  }
}
