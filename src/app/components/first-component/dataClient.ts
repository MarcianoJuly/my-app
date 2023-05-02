export class DataClient{
   public name: string;
   public cpfClient: string;
   public bornIn: string;
   public emailClient: string;
   public telephones: number;
   public cep: number;
   public adress: string;
   public houseNumber: string;
   public complement: string;
   public neighborhood: string;
   public city: string;
   public regionState: string;

    constructor(){
        this.name = '';
        this.cpfClient = '';
        this.bornIn = '';
        this.emailClient = '';
        this.telephones= 0;
        this.cep = 0;
        this.adress = '';
        this.houseNumber = '';
        this.complement = '';
        this.neighborhood = '';
        this.city = '';
        this.regionState = '';
    }

    setValue(values: any){
        this.name = values.name;
        this.cpfClient = values.cpfClient;
        this.bornIn = values.bornIn;
        this.emailClient = values.emailClient;
        this.telephones = values.telephones;
        this.cep = values.cep;
        this.adress = values.adress;
        this.houseNumber = values.houseNumber;
        this.complement = values.complement;
        this.neighborhood = values.neighborhood;
        this.city = values.city;
        this.regionState = values.regionState;  
    }
}
    