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
    
}
    