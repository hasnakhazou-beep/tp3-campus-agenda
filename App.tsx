
import { View, Text, StyleSheet, FlatList } from 'react-native';

// TypeScript : type d'un événement
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

// Liste des événements
const evenements: Evenement[] = [
  {
    id: 'E01',
    titre: 'Atelier React',
    categorie: 'Atelier',
    capacite: 25,
    inscrits: 25,
  },
  {
    id: 'E02',
    titre: 'Conférence IA',
    categorie: 'Conférence',
    capacite: 70,
    inscrits: 52,
  },
  {
    id: 'E03',
    titre: 'Sécurité mobile',
    categorie: 'Atelier',
    capacite: 20,
    inscrits: 17,
  },
  {
    id: 'E04',
    titre: 'Design UI',
    categorie: 'Atelier',
    capacite: 18,
    inscrits: 9,
  },
  {
    id: 'E05',
    titre: 'Forum projets',
    categorie: 'Rencontre',
    capacite: 50,
    inscrits: 49,
  },
  {
    id: 'E06',
    titre: 'Découverte Git',
    categorie: 'Atelier',
    capacite: 24,
    inscrits: 24,
  },
];

// Calcul du nombre de places restantes
function placesRestantes(evenement: Evenement): number {
  return Math.max(0, evenement.capacite - evenement.inscrits);
}

// Détermination du statut d'un événement
function statutEvenement(evenement: Evenement): string {
  const places = placesRestantes(evenement);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}

// Nombre total des événements
const totalEvenements = evenements.length;

// Nombre des événements complets
const evenementsComplets = evenements.filter(
  (evenement) => placesRestantes(evenement) === 0
).length;

// Nombre des événements avec des places disponibles
const evenementsAvecPlaces = evenements.filter(
  (evenement) => placesRestantes(evenement) > 0
).length;

// Calcul du nombre total des places restantes
const totalPlacesRestantes = evenements.reduce(
  (total, evenement) => total + placesRestantes(evenement),
  0
);

// Liste des ateliers disponibles
const ateliersDisponibles = evenements.filter(
  (evenement) =>
    evenement.categorie === 'Atelier' &&
    placesRestantes(evenement) > 0
);

// Liste des statistiques
const statistiques = [
  { id: '1', titre: 'Événements au total', nombre: totalEvenements },
  { id: '2', titre: 'Événements complets', nombre: evenementsComplets },
  { id: '3', titre: 'Événements avec des places', nombre: evenementsAvecPlaces },
  { id: '4', titre: 'Places restantes', nombre: totalPlacesRestantes },
];

// Composant BadgeEtat
function BadgeEtat({ statut }: { statut: string }) {
  let couleur = '#BBF7D0';

  if (statut === 'Complet') {
    couleur = '#FECACA';
  } else if (statut === 'Presque complet') {
    couleur = '#FED7AA';
  }

  return (
    <View style={[styles.badge, { backgroundColor: couleur }]}>
      <Text>{statut}</Text>
    </View>
  );
}

// Composant CarteEvenement
function CarteEvenement({ evenement }: { evenement: Evenement }) {
  return (
    <View style={styles.carte}>
    <Text style={styles.titreCarte}>{evenement.titre}</Text>
    <Text>Catégorie : {evenement.categorie}</Text>
    <Text>Capacité : {evenement.capacite}</Text>
    <Text>Inscrits : {evenement.inscrits}</Text>
    <Text>Places restantes : {placesRestantes(evenement)}</Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}

// Composant BlocStatistique
function BlocStatistique({
  titre,
  nombre,
}: {
  titre: string;
  nombre: number;
}) {
  return (
    <View style={styles.statistique}>
    <Text>{titre}</Text>
    <Text style={styles.nombre}>{nombre}</Text>
    </View>
  );
}

// Composant principal
export default function App() {

  // Changer la valeur en 'ateliers' pour afficher les ateliers disponibles
  const mode = 'tous';

  const evenementsAffiches =
    mode === 'tous' ? evenements : ateliersDisponibles;

  return (
    <View style={styles.container}>
      <FlatList
      data={evenementsAffiches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListHeaderComponent={
  <View>
  <Text style={styles.title}>CampusAgenda</Text>
          <Text style={styles.sousTitre}>
              Gestion des événements du campus
            </Text>

<Text style={styles.titreSection}>Statistiques</Text>

  <View style={styles.statistiques}>
              {statistiques.map((statistique) => (
                <BlocStatistique
        key={statistique.id}
        titre={statistique.titre}
        nombre={statistique.nombre}
        />
    ))}
</View>

<Text style={styles.titreSection}>
              {mode === 'tous'
                ? 'Tous les événements'
                : 'Ateliers disponibles'}
</Text>
</View>
        }
        ListEmptyComponent={
          <Text style={styles.messageVide}>
            Aucun atelier disponible
          </Text>
        }
      />
    </View>
  );
}



// Styles de l'application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  sousTitre: {
    textAlign: 'center',
    marginBottom: 15,
  },

  titreSection: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 10,
  },

  statistiques: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statistique: {
    width: '48%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },

  carte: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },

  titreCarte: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  badge: {
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
  },

  messageVide: {
    textAlign: 'center',
    marginTop: 15,
  },
});
