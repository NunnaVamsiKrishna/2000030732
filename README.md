# 2000030732
## Screenshots:
### Train details in sorted order:
![image](https://github.com/NunnaVamsiKrishna/2000030732/assets/89993455/07f37566-9483-48c5-903d-ba9bce8883ba)
![image](https://github.com/NunnaVamsiKrishna/2000030732/assets/89993455/02a2d1c1-d4f8-4487-bd4f-62eb7c673894)
![image](https://github.com/NunnaVamsiKrishna/2000030732/assets/89993455/ccfca76a-ac2f-4ef9-ba9a-4d0466c7ed2a)
1. Personal Growth Focus:
"I am committed to continuous learning and skill development, particularly in Front-end (React) and UI-UX, to enhance my contributions to the team and deliver exceptional user experiences."


2. Commitment to Excellence:
"My objective is to deliver world-class service by prioritizing customer satisfaction and continuously seeking ways to improve processes, ensuring that clients receive the best possible support and solutions."


3. Team Collaboration:
"I aim to foster a collaborative environment by actively engaging with colleagues to share insights and refine our approaches, leading to more innovative solutions and enhanced team performance."


4. Operational Efficiency:
"I strive to optimize our operations through automation, significantly reducing manual efforts and minimizing errors, ultimately streamlining deployment and backup processes for improved reliability."


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class SQLInsertComparer {
    public static void main(String[] args) {
        String filePath1 = "path/to/your/firstFile.sql";
        String filePath2 = "path/to/your/secondFile.sql";

        try {
            compareSQLFiles(filePath1, filePath2);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void compareSQLFiles(String filePath1, String filePath2) throws IOException {
        Set<String> insertStatements1 = loadSQLFile(filePath1);
        Set<String> insertStatements2 = loadSQLFile(filePath2);

        Set<String> onlyInFirstFile = new HashSet<>(insertStatements1);
        onlyInFirstFile.removeAll(insertStatements2);

        Set<String> onlyInSecondFile = new HashSet<>(insertStatements2);
        onlyInSecondFile.removeAll(insertStatements1);

        if (onlyInFirstFile.isEmpty() && onlyInSecondFile.isEmpty()) {
            System.out.println("The SQL insert queries are identical in both files.");
        } else {
            System.out.println("Differences found:");
            
            if (!onlyInFirstFile.isEmpty()) {
                System.out.println("\nStatements only in the first file:");
                for (String stmt : onlyInFirstFile) {
                    System.out.println(stmt);
                }
            }

            if (!onlyInSecondFile.isEmpty()) {
                System.out.println("\nStatements only in the second file:");
                for (String stmt : onlyInSecondFile) {
                    System.out.println(stmt);
                }
            }
        }
    }

    private static Set<String> loadSQLFile(String filePath) throws IOException {
        Set<String> insertStatements = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            StringBuilder statement = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                
                // Accumulate lines into a full statement, typically ending with a semicolon.
                if (!line.isEmpty()) {
                    statement.append(line).append(" ");
                    if (line.endsWith(";")) {
                        insertStatements.add(statement.toString().trim());
                        statement.setLength(0); // Reset for the next statement
                    }
                }
            }
        }
        return insertStatements;
    }
}
