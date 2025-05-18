import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  // Date mock pentru raportări
  const raportari: Raportare[] = [
    {
      id: 1,
      utilizator: "User1",
      continut: "Imagine nepotrivita",
      motiv: "Nuditate",
      data: "2024-01-10",
      status: "pending",
    },
    {
      id: 2,
      utilizator: "User2",
      continut: "Text ofensator",
      motiv: "Rasism",
      data: "2024-01-15",
      status: "resolved",
    },
    {
      id: 3,
      utilizator: "User3",
      continut: "Mesaj abuziv",
      motiv: "Hărțuire",
      data: "2024-01-20",
      status: "pending",
    },
  ];

  // Date mock pentru utilizatori
  const utilizatori: Utilizator[] = [
    {
      id: 101,
      nume: "User1",
      email: "user1@example.com",
      status: "activ",
      data_inregistrare: "2023-12-01",
    },
    {
      id: 102,
      nume: "User2",
      email: "user2@example.com",
      status: "blocat",
      data_inregistrare: "2023-12-15",
    },
    {
      id: 103,
      nume: "User3",
      email: "user3@example.com",
      status: "activ",
      data_inregistrare: "2024-01-10",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Panou de Control Administrator
      </h1>

      {/* Raportări */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Raportări Utilizatori</CardTitle>
          <CardDescription>
            Gestionați conținutul raportat de utilizatori.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea>
            <Table>
              <TableCaption>Lista raportărilor de la utilizatori.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Utilizator</TableHead>
                  <TableHead>Conținut</TableHead>
                  <TableHead>Motiv</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {raportari.map((raportare) => (
                  <TableRow key={raportare.id}>
                    <TableCell className="font-medium">
                      {raportare.id}
                    </TableCell>
                    <TableCell>{raportare.utilizator}</TableCell>
                    <TableCell>{raportare.continut}</TableCell>
                    <TableCell>{raportare.motiv}</TableCell>
                    <TableCell>{raportare.data}</TableCell>
                    <TableCell>{raportare.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Vezi
                      </Button>
                      <Button variant="destructive" size="sm">
                        Șterge
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Utilizatori */}
      <Card>
        <CardHeader>
          <CardTitle>Gestionare Utilizatori</CardTitle>
          <CardDescription>
            Blocați, deblocați sau ștergeți utilizatori.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea>
            <Table>
              <TableCaption>Lista utilizatorilor înregistrați.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Nume</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Înregistrare</TableHead>
                  <TableHead className="text-right">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utilizatori.map((utilizator) => (
                  <TableRow key={utilizator.id}>
                    <TableCell className="font-medium">
                      {utilizator.id}
                    </TableCell>
                    <TableCell>{utilizator.nume}</TableCell>
                    <TableCell>{utilizator.email}</TableCell>
                    <TableCell>{utilizator.status}</TableCell>
                    <TableCell>{utilizator.data_inregistrare}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Vezi
                      </Button>
                      <Button
                        variant={
                          utilizator.status === "blocat"
                            ? "secondary"
                            : "destructive"
                        }
                        size="sm"
                      >
                        {utilizator.status === "blocat"
                          ? "Deblochează"
                          : "Blochează"}
                      </Button>
                      <Button variant="destructive" size="sm">
                        Șterge
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
